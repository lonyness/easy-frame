package com.frame.easy.modular.sys.service.impl;

import com.frame.easy.common.constant.SessionConst;
import com.frame.easy.core.shiro.session.RedisSessionDAO;
import com.frame.easy.modular.sys.model.SysUser;
import com.frame.easy.modular.sys.model.SysUserOnline;
import com.frame.easy.modular.sys.service.SysUserOnlineService;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * 会话管理
 *
 * @author tengchong
 * @date 2018/9/12
 */
@Service
public class SysOnlineServiceImpl implements SysUserOnlineService {

    @Autowired
    private RedisSessionDAO sessionDAO;

    @Override
    public List<SysUserOnline> select() {
        List<SysUserOnline> sysUserOnlineList = new ArrayList<>();
        Collection<Session> sessions = sessionDAO.getActiveSessions();
        if (sessions != null && sessions.size() > 0) {
            for (Session session : sessions) {
                SysUserOnline sysUserOnline = new SysUserOnline();
                SysUser sysUser;
                SimplePrincipalCollection principalCollection;
                if (session.getAttribute(DefaultSubjectContext.PRINCIPALS_SESSION_KEY) == null) {
                    continue;
                } else {
                    principalCollection = (SimplePrincipalCollection) session.getAttribute(DefaultSubjectContext.PRINCIPALS_SESSION_KEY);
                    sysUser = (SysUser) principalCollection.getPrimaryPrincipal();
                    sysUserOnline.setUsername(sysUser.getUsername());
                    sysUserOnline.setNickname(sysUser.getNickname());
                    sysUserOnline.setPhone(sysUser.getPhone());
                    sysUserOnline.setId(sysUser.getId());
                }
                sysUserOnline.setSessionId((String) session.getId());
                sysUserOnline.setHost(session.getHost());
                sysUserOnline.setStartTimestamp(session.getStartTimestamp());
                sysUserOnline.setLastAccessTime(session.getLastAccessTime());
                if (session.getTimeout() == 0L) {
                    sysUserOnline.setStatus(0);
                } else {
                    sysUserOnline.setStatus(1);
                }
                sysUserOnline.setTimeout(session.getTimeout());
                sysUserOnlineList.add(sysUserOnline);
            }
        }
        return sysUserOnlineList;
    }

    @Override
    public boolean forceLogout(String sessionId) {
        Session session = sessionDAO.readSession(sessionId);
        if (session != null) {
            // 标记为管理员强制退出
            session.setAttribute(SessionConst.FORCE_LOGOUT, true);
            sessionDAO.update(session);
//            sessionDAO.delete(session); // 拦截器中检查是否标记已踢出的属性,如有则返回已踢出提醒并删除session
            return true;
        } else {
            return false;
        }
    }
}
