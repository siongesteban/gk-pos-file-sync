# Ghost Kitchen - File Sync

> A console app that downloads menu and order files.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Vercel PKG](https://img.shields.io/badge/pkg-000?style=for-the-badge&logo=vercel&logoColor=white)

## Table of contents

- [Ghost Kitchen - File Sync](#ghost-kitchen---file-sync)
  - [Table of contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
    - [Tools](#tools)
    - [Config](#config)
  - [Usage](#usage)
    - [Install dependencies](#install-dependencies)
    - [Run in development mode](#run-in-development-mode)
    - [Create executable file for Windows](#create-executable-file-for-windows)
    - [Create executable file for macOS](#create-executable-file-for-macos)
  - [File Download](#file-download)
    - [Menu](#menu)
    - [Order](#order)
  - [AWS SQS](#aws-sqs)
    - [`download-order-file`](#download-order-file)

## Prerequisites

### Tools

- Node.js _v18.19.0_
- Yarn _1.22.19_

### Config

Create a copy of [`src/app/env.example.json`](src/app/env.example.json) named `env.json` and set the correct values. Alternatively, you can ask other contributors for the file.

## Usage

### Install dependencies

```sh
yarn # shorthand for `yarn install`
```

### Run in development mode

```sh
yarn start:dev
```

### Create executable file for Windows

```sh
yarn pkg:win # Outputs `pkg/win.exe`
```

### Create executable file for macOS

```sh
yarn pkg:mac # Outputs `pkg/mac`
```

## File Download

Files will be saved under [`files`](files) folder.

### Menu

- `files/menu.csv`
- Downloaded via a cron job. The file is redownloaded every minute.

### Order

- `files/orders/ORDER_1106.xml`
- Downloaded via AWS SQS.

## AWS SQS

The following queues must be created in order for the app to run:

### `download-order-file`

```json
{
  "url": "https://some-bucket.s3.us-west-2.amazonaws.com/gk-files/ORDER_1106.xml",
  "fileName": "ORDER_1106.xml"
}
```

Also see: [`sqs-names.ts`](src/app/sqs-names.ts)
