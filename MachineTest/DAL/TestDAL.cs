using MachineTest.Interface;
using MachineTest.Models;
using System.Data;
using System.Data.SqlClient;

namespace MachineTest.DAL
{
    public class TestDAL:ITestInterface
    {
        public DataSet ExecuteTestForm(TestModel obj)
        {
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection con = new SqlConnection(ConnectionString.getSqlConnection("myconn")))
                {
                    SqlCommand cmd = new SqlCommand("SP_TEST_CRUD", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Mode",obj.Mode);
                    cmd.Parameters.AddWithValue("@ID",obj.ID);
                    cmd.Parameters.AddWithValue("@ItemID", obj.ItemID);
                    cmd.Parameters.AddWithValue("@Name", obj.Name);
                    cmd.Parameters.AddWithValue("@Price", obj.Price);
                    cmd.Parameters.AddWithValue("@Tax", obj.Tax);
                    cmd.Parameters.AddWithValue("@Qty", obj.Qty);
                    cmd.Parameters.AddWithValue("@Amount", obj.Amount);
                    if (con.State == ConnectionState.Open)
                        con.Close();
                    con.Open();
                    SqlDataAdapter sda=new SqlDataAdapter(cmd);
                    sda.Fill(ds);
                }  
            } 
            catch (Exception)
            {
                ds = null;
            } 
            return ds;
        }   
    }
}
