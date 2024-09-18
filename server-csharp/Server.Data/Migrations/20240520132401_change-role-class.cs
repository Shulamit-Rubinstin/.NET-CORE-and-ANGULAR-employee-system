using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class changeroleclass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EntryDate",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "IsManager",
                table: "Roles");

            migrationBuilder.AddColumn<bool>(
                name: "IsManager",
                table: "RolesForEmployee",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsManager",
                table: "RolesForEmployee");

            migrationBuilder.AddColumn<DateTime>(
                name: "EntryDate",
                table: "Roles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsManager",
                table: "Roles",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
