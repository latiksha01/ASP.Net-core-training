FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ems_mvc.csproj .
RUN dotnet restore ems_mvc.csproj

COPY . .
RUN dotnet publish ems_mvc.csproj -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ems_mvc.dll"]