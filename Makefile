DEFAULT=./.env
VARIABLES=`cat $(DEFAULT) | xargs`

start:
	env $(VARIABLES) PORT=9090 DEBUG=app:error npm run start

migrate-run:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:migrate

migrate-undo:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:migrate:undo

seed-run:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:seed

seed-run-all:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:seed:all

seed-undo:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:seed:undo

seed-undo-all:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:seed:undo:all