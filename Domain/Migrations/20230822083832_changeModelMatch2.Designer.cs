﻿// <auto-generated />
using System;
using Domain.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Domain.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230822083832_changeModelMatch2")]
    partial class changeModelMatch2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.Models.Account.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Code")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Domain.Models.Account.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<long?>("CaptainTeamId")
                        .HasColumnType("bigint");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("Information")
                        .HasColumnType("text");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("OwnerName")
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset>("RegistrationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Domain.Models.Account.UserRole", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uuid");

                    b.Property<long>("SID")
                        .HasColumnType("bigint");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Domain.Models.Account.UserType", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<int>("Code")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("UserTypes");
                });

            modelBuilder.Entity("Domain.Models.Championat", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<int>("ChampionatFormat")
                        .HasColumnType("integer");

                    b.Property<int>("CountYellowAfterDis")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsDefaultChamp")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsNeededSubsToProtocol")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsRevertSubs")
                        .HasColumnType("boolean");

                    b.Property<int>("LapsCount")
                        .HasColumnType("integer");

                    b.Property<long?>("LogoFileId")
                        .HasColumnType("bigint");

                    b.Property<long?>("LogoId")
                        .HasColumnType("bigint");

                    b.Property<int>("MaxPlayerPerMatch")
                        .HasColumnType("integer");

                    b.Property<int>("MinutesTime")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("PLayersCount")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("SubsCount")
                        .HasColumnType("integer");

                    b.Property<string>("YearString")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LogoFileId");

                    b.ToTable("Championats");
                });

            modelBuilder.Entity("Domain.Models.ChampionatStats", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("ChampionatId")
                        .HasColumnType("bigint");

                    b.Property<int>("Draw")
                        .HasColumnType("integer");

                    b.Property<int>("Goals")
                        .HasColumnType("integer");

                    b.Property<int>("GoalsConceded")
                        .HasColumnType("integer");

                    b.Property<int>("Lose")
                        .HasColumnType("integer");

                    b.Property<int>("Points")
                        .HasColumnType("integer");

                    b.Property<int>("RedCards")
                        .HasColumnType("integer");

                    b.Property<long>("TeamId")
                        .HasColumnType("bigint");

                    b.Property<int>("Win")
                        .HasColumnType("integer");

                    b.Property<int>("YellowCards")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ChampionatId");

                    b.HasIndex("TeamId");

                    b.ToTable("ChampionatStats");
                });

            modelBuilder.Entity("Domain.Models.Discfalification", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("ChampionatId")
                        .HasColumnType("bigint");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<int>("MatchesCount")
                        .HasColumnType("integer");

                    b.Property<int>("MatchesLeft")
                        .HasColumnType("integer");

                    b.Property<long>("PlayerId")
                        .HasColumnType("bigint");

                    b.Property<long>("TeamId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ChampionatId");

                    b.HasIndex("PlayerId");

                    b.HasIndex("TeamId");

                    b.ToTable("Discfalifications");
                });

            modelBuilder.Entity("Domain.Models.LogoFile", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<byte[]>("Content")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<string>("ContentType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("DateUpload")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FileExtension")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("FileLength")
                        .HasColumnType("bigint");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("LogoFiles");
                });

            modelBuilder.Entity("Domain.Models.Match", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("ChampionatId")
                        .HasColumnType("bigint");

                    b.Property<int?>("FanCount")
                        .HasColumnType("integer");

                    b.Property<int?>("HomeGoals")
                        .HasColumnType("integer");

                    b.Property<long>("HomeTeamId")
                        .HasColumnType("bigint");

                    b.Property<bool>("IsEnded")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsLive")
                        .HasColumnType("boolean");

                    b.Property<int?>("MatchResult")
                        .HasColumnType("integer");

                    b.Property<int>("Round")
                        .HasColumnType("integer");

                    b.Property<long?>("StadiumId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("StartMatch")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("VisitorGoals")
                        .HasColumnType("integer");

                    b.Property<long>("VisitorId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ChampionatId");

                    b.HasIndex("HomeTeamId");

                    b.HasIndex("StadiumId");

                    b.HasIndex("VisitorId");

                    b.ToTable("Matches");
                });

            modelBuilder.Entity("Domain.Models.MatchEvent", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("EventId")
                        .HasColumnType("bigint");

                    b.Property<long>("MatchId")
                        .HasColumnType("bigint");

                    b.Property<int>("Minute")
                        .HasColumnType("integer");

                    b.Property<long>("PlayerId")
                        .HasColumnType("bigint");

                    b.Property<long>("TeamId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.HasIndex("MatchId");

                    b.HasIndex("PlayerId");

                    b.HasIndex("TeamId");

                    b.ToTable("MatchEvents");
                });

            modelBuilder.Entity("Domain.Models.NRI.Event", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("Create")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<long>("LogoId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ShortName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LogoId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Domain.Models.NRI.Position", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int?>("PositionType")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("Domain.Models.NRI.Stadium", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Adress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<long?>("LogoFileId")
                        .HasColumnType("bigint");

                    b.Property<long?>("LogoId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LogoFileId");

                    b.ToTable("Stadiums");
                });

            modelBuilder.Entity("Domain.Models.News.News", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("ViewsCount")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("News");
                });

            modelBuilder.Entity("Domain.Models.Player", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long?>("AvatarFileId")
                        .HasColumnType("bigint");

                    b.Property<long?>("AvatarId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("Birthday")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("MiddleName")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("SecondName")
                        .HasColumnType("text");

                    b.Property<long>("TeamId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("AvatarFileId");

                    b.HasIndex("TeamId");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("Domain.Models.Squad", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<bool>("IsStartSquad")
                        .HasColumnType("boolean");

                    b.Property<long>("MatchId")
                        .HasColumnType("bigint");

                    b.Property<long>("PlayerId")
                        .HasColumnType("bigint");

                    b.Property<long>("TeamId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("MatchId");

                    b.HasIndex("PlayerId");

                    b.HasIndex("TeamId");

                    b.ToTable("Squads");
                });

            modelBuilder.Entity("Domain.Models.Team", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long?>("CaptainId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("CreateTeam")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<long?>("LogoFileId")
                        .HasColumnType("bigint");

                    b.Property<long?>("LogoId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LogoFileId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Domain.RefreshToken", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTimeOffset>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Domain.Models.Account.UserRole", b =>
                {
                    b.HasOne("Domain.Models.Account.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Account.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Models.Championat", b =>
                {
                    b.HasOne("Domain.Models.LogoFile", "LogoFile")
                        .WithMany()
                        .HasForeignKey("LogoFileId");

                    b.Navigation("LogoFile");
                });

            modelBuilder.Entity("Domain.Models.ChampionatStats", b =>
                {
                    b.HasOne("Domain.Models.Championat", "Championat")
                        .WithMany()
                        .HasForeignKey("ChampionatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Championat");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Domain.Models.Discfalification", b =>
                {
                    b.HasOne("Domain.Models.Championat", "Championat")
                        .WithMany()
                        .HasForeignKey("ChampionatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Player", "Player")
                        .WithMany()
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Championat");

                    b.Navigation("Player");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Domain.Models.Match", b =>
                {
                    b.HasOne("Domain.Models.Championat", "Championat")
                        .WithMany()
                        .HasForeignKey("ChampionatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Team", "HomeTeam")
                        .WithMany()
                        .HasForeignKey("HomeTeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.NRI.Stadium", "Stadium")
                        .WithMany()
                        .HasForeignKey("StadiumId");

                    b.HasOne("Domain.Models.Team", "Visitor")
                        .WithMany()
                        .HasForeignKey("VisitorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Championat");

                    b.Navigation("HomeTeam");

                    b.Navigation("Stadium");

                    b.Navigation("Visitor");
                });

            modelBuilder.Entity("Domain.Models.MatchEvent", b =>
                {
                    b.HasOne("Domain.Models.NRI.Event", "Event")
                        .WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Match", "Match")
                        .WithMany()
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Player", "Player")
                        .WithMany()
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Match");

                    b.Navigation("Player");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Domain.Models.NRI.Event", b =>
                {
                    b.HasOne("Domain.Models.LogoFile", "Logo")
                        .WithMany()
                        .HasForeignKey("LogoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Logo");
                });

            modelBuilder.Entity("Domain.Models.NRI.Stadium", b =>
                {
                    b.HasOne("Domain.Models.LogoFile", "LogoFile")
                        .WithMany()
                        .HasForeignKey("LogoFileId");

                    b.Navigation("LogoFile");
                });

            modelBuilder.Entity("Domain.Models.Player", b =>
                {
                    b.HasOne("Domain.Models.LogoFile", "AvatarFile")
                        .WithMany()
                        .HasForeignKey("AvatarFileId");

                    b.HasOne("Domain.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AvatarFile");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Domain.Models.Squad", b =>
                {
                    b.HasOne("Domain.Models.Match", "Match")
                        .WithMany()
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Player", "Player")
                        .WithMany()
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Match");

                    b.Navigation("Player");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Domain.Models.Team", b =>
                {
                    b.HasOne("Domain.Models.LogoFile", "LogoFile")
                        .WithMany()
                        .HasForeignKey("LogoFileId");

                    b.Navigation("LogoFile");
                });

            modelBuilder.Entity("Domain.RefreshToken", b =>
                {
                    b.HasOne("Domain.Models.Account.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.HasOne("Domain.Models.Account.Role", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.HasOne("Domain.Models.Account.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.HasOne("Domain.Models.Account.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.HasOne("Domain.Models.Account.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Models.Account.Role", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("Domain.Models.Account.User", b =>
                {
                    b.Navigation("UserRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
