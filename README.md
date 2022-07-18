# aws-cloudwatch-annotations ![Build](https://travis-ci.org/anaynayak/aws-cloudwatch-annotations.svg?branch=master) ![Downloads](https://img.shields.io/npm/dw/aws-cloudwatch-annotations) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/aws-cloudwatch-annotations)


> Annotate Cloudwatch dashboards with horizontal/vertical annotations

## Install 
```
$ npm install --global aws-cloudwatch-annotations
```

## Usage
```
$ aws-cloudwatch-annotations help
Usage:
    aws-cloudwatch-annotations dashboard_name
Options:
    --fill, -f              Fill value for annotation (before/after/between)
    --color, -c             Annotation color
    --widget-title, -w      Update only widgets whose title matching specified regex
    --limit, -l             Max number of annotations to maintain
    --title, -t             Annotation title. Default: 'Deployment'
    --value, -v             Annotation value. Default: Current time
    --horizontal, -h        Add horizontal annotation instead of vertical (default)
```

Initial setup for AWS credentials available via environment variables or via the shared credentials file is necessary. Please look at [AWS credentials documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) for details.

If `aws-cloudwatch-annotations` is run on an EC2 instance add the following permissions to the instance role. Adapt it with the correct AWS account ID and dashboard name(s).
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudwatch:PutDashboard",
                "cloudwatch:GetDashboard"
            ],
            "Resource": [
                "arn:aws:cloudwatch::123456789123:dashboard/annotations"
            ]
        }
    ]
}
```

## Examples

```
# Vertical annotation between two timestamps
aws-cloudwatch-annotations api-metrics --widget-title annotations --title 'Deployment #42' --value '2018-08-28T11:56:47Z' --upto '2018-08-29T11:59:47Z'

# Vertical annotation at a single timestamp
aws-cloudwatch-annotations api-metrics --widget-title annotations --title 'Enable feature toggle' --value '2018-08-28T11:56:47Z' 
```
