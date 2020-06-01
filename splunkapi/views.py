# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.core import serializers
import json

import requests
import splunklib.client as client
import splunklib

from django.views.generic import View
from django.http.response import JsonResponse
from django.core.mail import send_mail
from splunk.settings import EMAIL_HOST_USER, EMAIL_HOST_PASSWORD
# Create your views here.


class SplunkSearch(View):
	@classmethod
	def format_response(cls, resp_code, status, message='', data=None):
		response = {
			'resp_code': resp_code,
			'status': status,
			'message': message
		}
		if data:
			response['data'] = data
		return JsonResponse(response)

	def get(self, request, **kwargs):
		server_ip = str(request.GET.get('server_ip'))or ''
		user_name = str(request.GET.get('username')) or ''
		password = str(request.GET.get('password')) or ''
		time_range = str(request.GET.get('time')) or ''
		email = str(request.GET.get('email')) or ''
		searchquery = str(request.GET.get('searchquery')) or 'index="windefender" EventCode=5001 OR EventCode=5010'
		if server_ip and user_name and password and time_range and searchquery:
			try:
				service = client.connect(
					host=server_ip,
					port=8089,
					username=user_name,
					password=password)
				if not searchquery.startswith('search'):
					searchquery = 'search ' + searchquery
				search = service.search(searchquery)
				sid = search.sid
				content = service.job(sid).content
				cont_tup = content.items()
			except Exception as e:
				return self.format_response(500, 'Failure', 'Oh snap!', data=e.message)

			if email:
				send_mail('Splunk response test', str(dict(cont_tup)), EMAIL_HOST_USER, [EMAIL_HOST_USER], fail_silently=False, auth_user=EMAIL_HOST_USER, auth_password=EMAIL_HOST_PASSWORD)
				return self.format_response(200, 'success', 'Mail sent Successfully')
			else:
				return self.format_response(200, 'success', '', data=dict(cont_tup))
		else:
			return self.format_response(411, 'failure', 'missing_data')
