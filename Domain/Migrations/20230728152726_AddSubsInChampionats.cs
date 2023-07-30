using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddSubsInChampionats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "FanCount",
                table: "Matches",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsEnded",
                table: "Matches",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsLive",
                table: "Matches",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Score",
                table: "Matches",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LogoId",
                table: "Events",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<bool>(
                name: "IsNeededSubsToProtocol",
                table: "Championats",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRevertSubs",
                table: "Championats",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "SubsCount",
                table: "Championats",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Events_LogoId",
                table: "Events",
                column: "LogoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_LogoFiles_LogoId",
                table: "Events",
                column: "LogoId",
                principalTable: "LogoFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_LogoFiles_LogoId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_LogoId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "FanCount",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "IsEnded",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "IsLive",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "LogoId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "IsNeededSubsToProtocol",
                table: "Championats");

            migrationBuilder.DropColumn(
                name: "IsRevertSubs",
                table: "Championats");

            migrationBuilder.DropColumn(
                name: "SubsCount",
                table: "Championats");
        }
    }
}
