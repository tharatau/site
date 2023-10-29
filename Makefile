.PHONY: build clean serve

build:
	node local.mjs build

clean:
	rm -rf docs

serve:
	node local.mjs serve
