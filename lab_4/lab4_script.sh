#!/bin/bash
# Authors : Ramon Fernandez-Garcia
# Date: 09/25/2020
cp /var/log/syslog /home
grep -E "error" error_log_check.txt | tee error_log_check.txt
# sendmail Rafe3007@Colorado.edu < error_log_check.txt
cat error_log_check.txt | mail -s "Lab 4" Rafe3007@Colorado.edu