# splunk
This program will connect the requested splunk server and show the JSON response of the connected search executed

All we need to do this setup is by the following procedures:
git init
git clone -b master <git repo link>

Now the code base will be download to your remote machine

Need to set environment variable

pip install virtualenv
virtualenv venv
source venv/bin/activate

Now your virtual environment is created. In this env install the packages for the python dependecies by

cd splunk/
pip install -r requirements.txt

Once Done, try running your Django code base with

python manage.py runserver

Before running your Django Application, need to set few variables

cd splunk/splunk/
open settings.py and add the sender email address and password in 
SENDER_EMAIL and SENDER_PASSWORD


Now your django will be hosted in your localhost in port 8000

React JS code
In the same Directory, need to setup node and create a ReactApp by

cd splunk/my-app/
npm install
npm start

* If incase of npm not working, kindly install node in your machine.

Now your React code runs in localhost:3000/ redirected browser.
Make sure to run both Django and React servers parallely for better API calls.

If the Splunk server is turned off, it responds with a exception response stating the "server is not reachable"
If the Email field is provided, server tries to send email to the respective recepients mentioned in the UI

** Field validations are not done in this application and hence please provide valid details in the respective slots

