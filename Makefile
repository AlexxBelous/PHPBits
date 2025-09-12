.PHONY: question

# make question 1
question:
	php generator.php $(filter-out $@,$(MAKECMDGOALS))

%:
	@:
