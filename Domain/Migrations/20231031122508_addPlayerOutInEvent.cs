using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class addPlayerOutInEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "PLayerOutId",
                table: "MatchEvents",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MatchEvents_PLayerOutId",
                table: "MatchEvents",
                column: "PLayerOutId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchEvents_Players_PLayerOutId",
                table: "MatchEvents",
                column: "PLayerOutId",
                principalTable: "Players",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchEvents_Players_PLayerOutId",
                table: "MatchEvents");

            migrationBuilder.DropIndex(
                name: "IX_MatchEvents_PLayerOutId",
                table: "MatchEvents");

            migrationBuilder.DropColumn(
                name: "PLayerOutId",
                table: "MatchEvents");
        }
    }
}
