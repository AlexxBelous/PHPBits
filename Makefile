# уже существовало:
question:
	docker compose run --rm generator $(N)
	@if [ "$$(uname -s)" = "Linux" ]; then \
		sudo chown -R $$(id -u):$$(id -g) \
			src/questions \
			src/answers \
			src/database \
			src/helpers/helpers.php \
			public/index.php; \
	fi

# создать класс и обновить комментарий в index.php
class:
	docker compose run --rm nodeutil node create-class.js $(NAME)
	@if [ "$$(uname -s)" = "Linux" ]; then \
		sudo chown -R $$(id -u):$$(id -g) src/classes public/index.php; \
	fi

# просто пересчитать "последний класс" и обновить комментарий
classes-update:
	docker compose run --rm nodeutil node update-last-class.js
	@if [ "$$(uname -s)" = "Linux" ]; then \
		sudo chown -R $$(id -u):$$(id -g) public/index.php; \
	fi
