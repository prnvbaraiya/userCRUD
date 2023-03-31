using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using userCRUDAPI.Models;

namespace userCRUDAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _dbContext;

        public UsersController(UserContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _dbContext.Users.Select(u => new {
                u.Id,
                u.FileAsByteArray,
                u.FirstName,
                u.LastName,
                u.Email,
                u.Age
            }).ToListAsync();

            if (users != null)
            {
                return Ok(users);
            }
            
            return NotFound();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Object>> GetUser(int id)
        {
            if (_dbContext.Users != null)
            {
                 var user = await _dbContext.Users.Where(u => u.Id == id)
                            .Select(u => new { u.Id, u.FileAsByteArray, u.FirstName, u.LastName, u.Email, u.Age }).FirstOrDefaultAsync();
                if (user != null)
                {
                    return user;
                }
                return NotFound();
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            System.Diagnostics.Debug.WriteLine("YAY I AM RUNNING");
            if (user.FileAsBase64 != null && user.FileAsBase64.Contains(','))
            {
                user.FileAsBase64 = user.FileAsBase64.Substring(user.FileAsBase64.IndexOf(",") + 1);
                try
                {
                    user.FileAsByteArray = Convert.FromBase64String(user.FileAsBase64);
                    _dbContext.Users.Add(user);
                    await _dbContext.SaveChangesAsync();
                    return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
                }
                catch (FormatException ex)
                {
                    System.Diagnostics.Debug.WriteLine("Error converting from Base64: " + ex.Message);
                    return NotFound();
                }
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> PutUser(int id,User user)
        {
           if (user.FileAsBase64 != null && user.FileAsBase64.Contains(','))
            {
                user.FileAsBase64 = user.FileAsBase64.Substring(user.FileAsBase64.IndexOf(",") + 1);
                try
                {
                    user.FileAsByteArray = Convert.FromBase64String(user.FileAsBase64);
                }
                catch (FormatException ex)
                {
                    System.Diagnostics.Debug.WriteLine("Error converting from Base64: " + ex.Message);
                    return BadRequest();
                }
            }

            _dbContext.Entry(user).State = EntityState.Modified;
            try
            {
                await _dbContext.SaveChangesAsync();
            } catch (Exception)
            {
                if (!UserExsist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();

        }

        private bool UserExsist(int id)
        {
            return (_dbContext.Users?.Any(e=>e.Id == id)).GetValueOrDefault();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if(_dbContext.Users == null)
            {
                return NotFound();
            }

            var user = await _dbContext.Users.FindAsync(id);
            if(user == null)
            {
                return NotFound();
            }
            else
            {
                _dbContext.Remove(user);
                await _dbContext.SaveChangesAsync();
                return NoContent();
            }
        }
    }
}
