package gcloud

import (
	"context"
	"os"

	vision "cloud.google.com/go/vision/apiv1"
	"github.com/taxio/errors"
)

func ask_vision(ctx context.Context, filename string) (string, error) {
	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		return "", errors.Wrap(err)
	}
	defer client.Close()

	file, err := os.Open(filename)
	if err != nil {
		return "", errors.Wrap(err)
	}
	defer file.Close()
	image, err := vision.NewImageFromReader(file)
	if err != nil {
		return "", errors.Wrap(err)
	}

	labels, err := client.DetectLabels(ctx, image, nil, 10)
	if err != nil {
		return "", errors.Wrap(err)
	}

	s := ""
	for _, label := range labels {
		s += label.Description + "\n"
	}
	return s, nil
}
