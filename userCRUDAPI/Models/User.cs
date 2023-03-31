namespace userCRUDAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? FileAsBase64 { get; set; }
        public byte[]? FileAsByteArray { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Email { get; set; } = string.Empty;
    }
}
