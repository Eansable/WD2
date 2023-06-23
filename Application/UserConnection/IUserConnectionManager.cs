﻿using System;
using System.Collections.Generic;

namespace Application.UserConnection
{
    public interface IUserConnectionManager
    {
        void KeepUserConnection(Guid userId, string connectionId);
        void RemoveUserConnection(string connectionId);
        List<string> GetUserConnections(Guid? userId);
    }
}
