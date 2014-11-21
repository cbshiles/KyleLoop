#!/bin/bash

#Using instance 2:
Id="i-76be6e7a"
PDNS="ec2-54-69-116-1.us-west-2.compute.amazonaws.com"
key="/home/brenan/code/KyleLoop/kyleLoopkeypair.pem"
ssh -i $key ubuntu@$PDNS

#Instance 1 info, currently not needed
#	echo "Instance 1:"
#	Id="i-d33b14db"
#	PDNS="ec2-54-200-181-38.us-west-2.compute.amazonaws.com"