#!/bin/sh

#Assumes your program is called index.js
exec node index.js &> mylog.out
#exec node index.js > mylog.out