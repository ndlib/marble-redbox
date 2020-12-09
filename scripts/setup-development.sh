if [ ! -f .env.development ]; then
  cp .env.test .env.development
  echo "Created .env.development and double check your keys."
fi
