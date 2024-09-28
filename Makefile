# Define the commands
dev:
	@echo "Starting development server..."
	http-server ./src  # Modify this if you're using a different command

build:
	@echo "Building the project..."
	sh script/build.sh  # Modify this according to your build command

deploy:
	@echo "Deploying to GitHub Pages..."
	git add .
	git commit -m "Deploying updates"
	git push origin main  # Ensure you push to the correct branch

clean:
	@echo "Cleaning up..."
	rm -rf ./dist  # Modify according to your build output directory
