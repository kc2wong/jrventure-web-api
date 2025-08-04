import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';

export interface CertificateStackProps extends StackProps {
  domainNames: string;
}

export class LinkedupWebApiCertificateStack extends Stack {
  public readonly webApiCert: acm.ICertificate;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, {
      ...props,
      crossRegionReferences: true,
    });

    this.webApiCert = new acm.Certificate(this, 'LinkedupWebApiCert', {
      domainName: props.domainNames, // required
      validation: acm.CertificateValidation.fromDns(),
    });
  }
}
