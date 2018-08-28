# aws-cw-annotate ![Build](https://travis-ci.org/anaynayak/aws-cloudwatch-annotations.svg?branch=master)


> Annotate Cloudwatch dashboards with horizontal/vertical annotations

## Install 
```
$ npm install --global aws-cw-annotate
```

## Usage
```
$ aws-cw-annotate help
Usage:
    aws-cw-annotate dashboard_name
Options:
    --fill, -f              Fill value for annotation (before/after/between)
    --color, -c             Annotation color
    --widget-title, -w      Update only widgets whose title matching specified regex
    --limit, -l             Max number of aws-cw-annotate annotations to maintain
    --title, -t             Annotation title. Default: 'Deployment'
    --value, -v             Annotation value. Default: Current time
    --horizontal, -h        Add horizontal annotation instead of vertical (default)
```

Initial setup for AWS credentials available via environment variables or via the shared credentials file is necessary. Please look at [AWS credentials documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) for details.
