# Reactivities

> Social network app based on C# .NET Core, React, Typescript & SQLite

## Installation

Ubuntu/Debian

.NET Core

```sh
sudo apt update
mkdir -p $HOME/dotnet && tar zxf dotnet-sdk-3.0.101-linux-x64.tar.gz -C $HOME/dotnet
export DOTNET_ROOT=$HOME/dotnet
export PATH=$PATH:$HOME/dotnet
nano ~/.bashrc
export PATH=$PATH:$HOME/dotnet
/At the end of the files add
export DOTNET_ROOT=$HOME/dotnet
nano ~/.bash_profile
export PATH=$PATH:$HOME/dotnet
/At the end of the files add
export DOTNET_ROOT=$HOME/dotnet
cd <Path to Reactivities folder>
cd API
dotnet watch run
```

Node & Npm

```sh
sudo apt update
sudo apt install nodejs
sudo apt install npm
cd <Path to Reactivities folder>
cd client-app
npm install --save
npm start
```

## Usage example

Start the client and server and go to the http://localhost:3000/.

## Meta

Distributed under the MIT license. See `LICENSE` for more information.

## Contributing

1. Fork it (<https://github.com/MartinStefko/Reactivities/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
