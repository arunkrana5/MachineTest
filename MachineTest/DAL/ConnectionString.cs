namespace MachineTest.DAL
{
    public class ConnectionString
    {
        public static string getSqlConnection(string key)
        {
            return new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetConnectionString(key).ToString();
        }
    }
}
