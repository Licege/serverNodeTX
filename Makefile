DEFAULT=./.env
VARIABLES=`cat $(DEFAULT) | xargs`

start-service:
	env $(VARIABLES) PORT=9090 npm run start

start-auth:
	env $(VARIABLES) PORT=9092 DEFAULT_EXECUTION_MODE=authorization npm run start

migrate-run:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:migrate

migrate-undo:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:migrate:undo

migrate-undo-all:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:migrate:undo:all

seed-run:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:seed

seed-run-all:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:seed:all

seed-undo:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:seed:undo

seed-undo-all:
	env $(VARIABLES) DB_NAME=trixolma sequelize db:seed:undo:all