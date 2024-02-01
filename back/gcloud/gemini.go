package gcloud

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/taxio/errors"
	"golang.org/x/oauth2/google"
)

type RequestBody struct {
	Contents         Contents         `json:"contents"`
	SafetySettings   SafetySettings   `json:"safety_settings"`
	GenerationConfig GenerationConfig `json:"generation_config"`
}

type Contents struct {
	Role  string `json:"role"`
	Parts Parts  `json:"parts"`
}

type Parts struct {
	Text string `json:"text"`
}

type SafetySettings struct {
	Category  string `json:"category"`
	Threshold string `json:"threshold"`
}

type GenerationConfig struct {
	Temperature float64 `json:"temperature"`
	TopP        float64 `json:"topP"`
	TopK        int     `json:"topK"`
}

type Response struct {
	Candidates []struct {
		Content struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"content"`
	} `json:"candidates"`
}

func ask_gemini(ctx context.Context, question string) (string, error) {
	client, err := google.DefaultClient(ctx, "https://www.googleapis.com/auth/cloud-platform")
	if err != nil {
		return "", errors.Wrap(err)
	}

	requestData := RequestBody{
		Contents: Contents{
			Role: "user",
			Parts: Parts{
				Text: "エアコンをエコに使う方法を教えてください",
			},
		},
		SafetySettings: SafetySettings{
			Category:  "HARM_CATEGORY_SEXUALLY_EXPLICIT",
			Threshold: "BLOCK_LOW_AND_ABOVE",
		},
		GenerationConfig: GenerationConfig{
			Temperature: 0.2,
			TopP:        0.8,
			TopK:        40,
		},
	}

	requestBodyBytes, err := json.Marshal(requestData)
	if err != nil {
		return "", errors.Wrap(err)
	}

	url := "https://us-central1-aiplatform.googleapis.com/v1/projects/gdsc-2024cca/locations/us-central1/publishers/google/models/gemini-pro:streamGenerateContent?alt=sse"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBodyBytes))
	if err != nil {
		return "", errors.Wrap(err)
	}

	req.Header.Set("Content-Type", "application/json; charset=utf-8")

	resp, err := client.Do(req)
	if err != nil {
		return "", errors.Wrap(err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", errors.Wrap(err)
	}

	lines := strings.Split(string(body), "\n")

	s := ""

	for _, line := range lines {
		if strings.HasPrefix(line, "data: ") {
			jsonData := line[6:]

			var response Response
			err = json.Unmarshal([]byte(jsonData), &response)
			if err != nil {
				fmt.Println("Error unmarshalling JSON data:", err)
				continue
			}

			for _, candidate := range response.Candidates {
				for _, part := range candidate.Content.Parts {
					s += part.Text
				}
			}
		}
	}

	return s, nil
}
