using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class addPositionCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Positions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositionType",
                table: "Positions",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "PositionType",
                table: "Positions");
        }
    }
}
