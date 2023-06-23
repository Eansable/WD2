using System;
using System.Collections.Generic;

namespace Application.UserConnection
{
    public class UserConnectionManager : IUserConnectionManager
    {
        private static Dictionary<Guid, List<string>> userConnectionMap = new Dictionary<Guid, List<string>>();
        private static string userConnectionMapLocker = string.Empty;

        public void KeepUserConnection(Guid userId, string connectionId)
        {
            lock (userConnectionMapLocker)
            {
                if (!userConnectionMap.ContainsKey(userId))
                {
                    userConnectionMap[userId] = new List<string>();
                }
                userConnectionMap[userId].Add(connectionId);
            }
        }

        public void RemoveUserConnection(string connectionId)
        {
            lock (userConnectionMapLocker)
            {
                var listUsers = userConnectionMap.Keys;
                foreach (var userId in listUsers)
                {
                    if (userConnectionMap.ContainsKey(userId) && userConnectionMap[userId].Contains(connectionId))
                    {
                        userConnectionMap[userId].Remove(connectionId);
                        if (userConnectionMap[userId].Count == 0)
                            userConnectionMap.Remove(userId);
                        break;
                    }
                }
            }
        }

        public List<string> GetUserConnections(Guid? userId)
        {
            var conn = new List<string>();
            if (!userId.HasValue)
                return null;
            lock (userConnectionMapLocker)
            {
                if (userConnectionMap.ContainsKey(userId.Value))
                    conn = userConnectionMap[userId.Value];
                else
                    conn = null;
            }
            return conn;
        }
    }
}
