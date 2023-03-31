using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace userCRUDAPI.Migrations
{
    /// <inheritdoc />
    public partial class fileUpload : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Profile",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "FileAsBase64",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "FileAsByteArray",
                table: "Users",
                type: "varbinary(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileAsBase64",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FileAsByteArray",
                table: "Users");

            migrationBuilder.AddColumn<byte[]>(
                name: "Profile",
                table: "Users",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
