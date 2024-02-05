package gcloud

import (
	"context"
	"encoding/base64"
	"os"
	"strconv"
	"time"

	vision "cloud.google.com/go/vision/apiv1"
	"github.com/taxio/errors"
)

func AskVision(ctx context.Context, base64Str string) (string, error) {
	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		return "", errors.Wrap(err)
	}
	defer client.Close()

	// Decode the base64 string to bytes
	data, err := base64.StdEncoding.DecodeString(base64Str)
	if err != nil {
		return "", errors.Wrap(err)
	}

	// Create a temporary file named by unixtime
	name := strconv.FormatInt(time.Now().Unix(), 10)
	tmpFile, err := os.CreateTemp("", name+".jpg")
	if err != nil {
		return "", errors.Wrap(err)
	}
	defer tmpFile.Close()
	defer os.Remove(tmpFile.Name()) // Clean up the file after we're done

	// Write the data to the temporary file
	if _, err := tmpFile.Write(data); err != nil {
		return "", errors.Wrap(err)
	}

	// Ensure the written data is flushed to storage
	if err := tmpFile.Sync(); err != nil {
		return "", errors.Wrap(err)
	}

	// Open the file for reading
	file, err := os.Open(tmpFile.Name())
	if err != nil {
		return "", errors.Wrap(err)
	}
	defer file.Close()

	// Create a vision.Image from the reader
	image, err := vision.NewImageFromReader(file)
	if err != nil {
		return "", errors.Wrap(err)
	}

	labels, err := client.DetectLabels(ctx, image, nil, 10)
	if err != nil {
		return "", errors.Wrap(err)
	}

	// Concatenate the descriptions of detected labels
	s := ""
	for _, label := range labels {
		s += label.Description + "\n"
	}
	return s, nil
}
