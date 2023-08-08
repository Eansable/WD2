using Domain.Context;
using Domain.Helpers.JWT;
using Domain.Middleware;
using Domain.Models.Account;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
        //.AllowCredentials();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<PasswordHasher<User>>();

var assembly = AppDomain.CurrentDomain.Load("Application");
builder.Services
               .AddMvc(setup =>
               {
                   setup.EnableEndpointRouting = false;
                   setup.Filters.Add<ValidationMiddleware>();
               }).AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssembly(assembly));
              

builder.Services.AddMediatR(assembly);
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddDataProtection().SetDefaultKeyLifetime(TimeSpan.FromDays(365));


var build = builder.Services.AddIdentityCore<User>();
var identityBuilder = new IdentityBuilder(build.UserType, build.Services);
identityBuilder.AddRoles<Role>();
identityBuilder.AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Tokens")["TokenKey"]));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = key,
        ValidateAudience = false,
        ValidateIssuer = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});
builder.Services.AddAuthorization();


builder.Services.AddScoped<JwtGenerator>();
builder.Services.AddScoped<UserAccessor>();

builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
    options.TokenLifespan = TimeSpan.FromMinutes(short.Parse(builder.Configuration.GetSection("Tokens")["TokenLifespan"])));


var app = builder.Build();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
#if DEBUG
app.UseCors("CorsPolicy");
#endif
app.UseAuthorization();

app.MapControllers();
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseMvc();

app.Run();
