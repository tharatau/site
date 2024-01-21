# Documentation

## Getting Started

1. Install Go Lang compiler.
1. Run `make serve` to run static file server.
1. Run `make build` to build HTML artifacts.
1. To add a new article, create a new file inside `./content` directory. For example `/content/2023-12-29`. Line 1 is expected to be the title. Line 3 is expected to be the start of the article.

## Design

I was inspired by Johnathan Blow's [ideas](https://www.youtube.com/watch?v=ZSRHeXYDLko) to create a website using just CSS, HTML, JavaScript (_and_ Go for local development).

## Requirements

- No third party modules.
- Minimise feature set.
