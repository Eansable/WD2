using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class addLogoFiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Stadium_StadiumId",
                table: "Matches");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Stadium",
                table: "Stadium");

            migrationBuilder.RenameTable(
                name: "Stadium",
                newName: "Stadiums");

            migrationBuilder.AddColumn<long>(
                name: "LogoFileId",
                table: "Teams",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "AvatarFileId",
                table: "Players",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "AvatarId",
                table: "Players",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LogoFileId",
                table: "Championats",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LogoId",
                table: "Championats",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LogoFileId",
                table: "Stadiums",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LogoId",
                table: "Stadiums",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stadiums",
                table: "Stadiums",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "LogoFiles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FileName = table.Column<string>(type: "text", nullable: false),
                    FileExtension = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<byte[]>(type: "bytea", nullable: false),
                    ContentType = table.Column<string>(type: "text", nullable: false),
                    FileLength = table.Column<long>(type: "bigint", nullable: false),
                    DateUpload = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogoFiles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Teams_LogoFileId",
                table: "Teams",
                column: "LogoFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_AvatarFileId",
                table: "Players",
                column: "AvatarFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Championats_LogoFileId",
                table: "Championats",
                column: "LogoFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Stadiums_LogoFileId",
                table: "Stadiums",
                column: "LogoFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Championats_LogoFiles_LogoFileId",
                table: "Championats",
                column: "LogoFileId",
                principalTable: "LogoFiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Stadiums_StadiumId",
                table: "Matches",
                column: "StadiumId",
                principalTable: "Stadiums",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_LogoFiles_AvatarFileId",
                table: "Players",
                column: "AvatarFileId",
                principalTable: "LogoFiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Stadiums_LogoFiles_LogoFileId",
                table: "Stadiums",
                column: "LogoFileId",
                principalTable: "LogoFiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_LogoFiles_LogoFileId",
                table: "Teams",
                column: "LogoFileId",
                principalTable: "LogoFiles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Championats_LogoFiles_LogoFileId",
                table: "Championats");

            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Stadiums_StadiumId",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_Players_LogoFiles_AvatarFileId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_Stadiums_LogoFiles_LogoFileId",
                table: "Stadiums");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_LogoFiles_LogoFileId",
                table: "Teams");

            migrationBuilder.DropTable(
                name: "LogoFiles");

            migrationBuilder.DropIndex(
                name: "IX_Teams_LogoFileId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Players_AvatarFileId",
                table: "Players");

            migrationBuilder.DropIndex(
                name: "IX_Championats_LogoFileId",
                table: "Championats");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Stadiums",
                table: "Stadiums");

            migrationBuilder.DropIndex(
                name: "IX_Stadiums_LogoFileId",
                table: "Stadiums");

            migrationBuilder.DropColumn(
                name: "LogoFileId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "AvatarFileId",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "AvatarId",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "LogoFileId",
                table: "Championats");

            migrationBuilder.DropColumn(
                name: "LogoId",
                table: "Championats");

            migrationBuilder.DropColumn(
                name: "LogoFileId",
                table: "Stadiums");

            migrationBuilder.DropColumn(
                name: "LogoId",
                table: "Stadiums");

            migrationBuilder.RenameTable(
                name: "Stadiums",
                newName: "Stadium");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stadium",
                table: "Stadium",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Stadium_StadiumId",
                table: "Matches",
                column: "StadiumId",
                principalTable: "Stadium",
                principalColumn: "Id");
        }
    }
}
