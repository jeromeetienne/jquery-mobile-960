# mini Makefile to automatize tasks

GAE_ROOT="/home/jerome/opt/gae/google_appengine"

help:
	@echo "$$ make server"
	@echo "\tRun the developement server"
	@echo "$$ make deploy"
	@echo "\tDeploy the application on google AppEngine"
	@echo "$$ make help"
	@echo "\tDisplay inline help"

server:
	$(GAE_ROOT)/dev_appserver.py .

build:
	node lib/build.js

minify:
	yuicompressor --type css css/jquery-mobile-fluid960.css > css/jquery-mobile-fluid960.min.css

deploy	: minify deployGhPage

deployGhPage:
	rm -rf /tmp/jquery-mobile-960GhPages
	(cd /tmp && git clone git@github.com:jeromeetienne/jquery-mobile-960.git jquery-mobile-960GhPages)
	(cd /tmp/jquery-mobile-960GhPages && git checkout gh-pages)
	cp -a * /tmp/jquery-mobile-960GhPages
	(cd /tmp/jquery-mobile-960GhPages && git add . && git commit -a -m "Another deployement" && git push origin gh-pages)
	#rm -rf /tmp/jquery-mobile-960GhPages
