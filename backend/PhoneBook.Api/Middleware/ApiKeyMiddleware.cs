namespace PhoneBook.Api.Middleware;

public class ApiKeyMiddleware(RequestDelegate next, IConfiguration configuration)
{
    private readonly string _apiKey = configuration["Authorization:ApiKey"] ?? "gudar-devs-demo-key";

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            if (!context.Request.Headers.TryGetValue("X-API-KEY", out var providedKey) || providedKey != _apiKey)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { message = "Missing or invalid API key." });
                return;
            }
        }

        await next(context);
    }
}
