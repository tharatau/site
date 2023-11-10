.PHONY: build clean serve

build:
	go run main.go

clean:
	rm -rf docs

serve:
	node local.mjs serve
