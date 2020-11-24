DEFAULT=./.env
VARIABLES=`cat $(DEFAULT) | xargs`

start:
	env $(VARIABLES) PORT=9090 npm run dev