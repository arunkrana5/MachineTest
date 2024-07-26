using MachineTest.DAL;
using MachineTest.Interface;
using MachineTest.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MachineTest.Controllers
{

    public class TestController : Controller
    {
        private ITestInterface testInterface;
        public TestController()
        {
            testInterface = new TestDAL();
        }
        public IActionResult Index(int? id)
        {
            ViewBag.Id = Convert.ToInt32(id);
            return View();
        }
        public IActionResult List()
        {
            return View();
        }
        [HttpPost]
        public string ExecuteTestForm(TestModel objEntity)
        {
            string str = "";
            try
            {
                str = JsonConvert.SerializeObject(testInterface.ExecuteTestForm(objEntity));
            }
            catch (Exception)
            {
                str = "";
            } 
            return str;
        }

    }
}
