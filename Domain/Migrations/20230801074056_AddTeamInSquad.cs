using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddTeamInSquad : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "TeamId",
                table: "Squads",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Squads_TeamId",
                table: "Squads",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Squads_Teams_TeamId",
                table: "Squads",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Squads_Teams_TeamId",
                table: "Squads");

            migrationBuilder.DropIndex(
                name: "IX_Squads_TeamId",
                table: "Squads");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Squads");
        }
    }
}
