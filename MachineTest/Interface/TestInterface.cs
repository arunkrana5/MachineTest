using MachineTest.Models;
using System.Data;

namespace MachineTest.Interface
{
    public interface ITestInterface
    {
        DataSet ExecuteTestForm(TestModel obj);
    }
}
