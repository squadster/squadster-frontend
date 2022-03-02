# Squadster frontend

[![License](https://img.shields.io/github/license/squadster/squadster-frontend.svg)](https://github.com/squadster/squadster-frontend/blob/master/LICENSE)
[![Build Status](https://travis-ci.com/squadster/squadster-frontend.svg?branch=master)](https://travis-ci.com/squadster/squadster-frontend)
<!---
[![Site status](https://img.shields.io/website?down_color=red&down_message=Offline&up_color=green&up_message=Up&url=http%3A%2F%2Fsquadster.wtf)](https://squadster.wtf)
-->

Frontend repository for Squadster. Check the [API repo](https://github.com/squadster/squadster-api) for more info.

## Installation guides

### Prepare development environment

Clone this repo:

```bash
git clone https://github.com/squadster/squadster-frontend.git
cd squadster-frontend
```

Install dependencies:

```bash
yarn install
```

Then edit `.env` file and change variables if needed.

That's all, now you can run development server with `yarn start`.

### Running test suite

There are no tests yet. The command to run interactive testing is:

```bash
yarn test
```

### Deployment

We use GitHub packages for deployment.

Check out [Dockerfile](Dockerfile) and [this repo](https://github.com/squadster/squadster-deployment) for more information.

Also check the [React deployment guides](https://facebook.github.io/create-react-app/docs/deployment).

## Contributing

Your ideas and wishes are welcome via [issues](https://github.com/squadster/squadster-frontend/issues) and [pull requets](https://github.com/squadster/squadster-frontend/pulls).

Check [contributing guidelines](CONTRIBUTING.md) for more info.

List of contributors available in the [main API repo](https://github.com/squadster/squadster-api).
