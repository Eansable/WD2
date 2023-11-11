using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class addCoach : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Coach",
                table: "Teams",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "Teams",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxPlayer",
                table: "Championats",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ChampionatTeamPlayers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlayerId = table.Column<long>(type: "bigint", nullable: false),
                    TeamId = table.Column<long>(type: "bigint", nullable: false),
                    ChampionatId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChampionatTeamPlayers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChampionatTeamPlayers_Championats_ChampionatId",
                        column: x => x.ChampionatId,
                        principalTable: "Championats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChampionatTeamPlayers_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChampionatTeamPlayers_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChampionatTeamPlayers_ChampionatId",
                table: "ChampionatTeamPlayers",
                column: "ChampionatId");

            migrationBuilder.CreateIndex(
                name: "IX_ChampionatTeamPlayers_PlayerId",
                table: "ChampionatTeamPlayers",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_ChampionatTeamPlayers_TeamId",
                table: "ChampionatTeamPlayers",
                column: "TeamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChampionatTeamPlayers");

            migrationBuilder.DropColumn(
                name: "Coach",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Link",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "MaxPlayer",
                table: "Championats");
        }
    }
}
