package com.frame.easy.common;

import com.frame.easy.config.properties.ProjectProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;

/**
 * 公用常量
 *
 * @author tengchong
 * @date 2018/9/4
 */
@Component
public class CommonConst {
    /**
     * 项目配置
     */
    public static ProjectProperties projectProperties;
    /**
     * 数据分隔符
     */
    public static final String SPLIT = ",";
    /**
     * false
     */
    public static final String FALSE = "false";
    /**
     * true
     */
    public static final String TRUE = "true";

    /**
     * 缓存方式
     */
    public static String CACHE_TYPE_REDIS = "redis";

    /**
     * 静态数据存放路径
     * 例如: 字典数据
     */
    public static String STATIC_DATA_PATH = "static" + File.separator + "data";
    /**
     * 默认文件夹图标
     */
    public static String DEFAULT_FOLDER_ICON = "la la-folder-open-o";

    /**
     * 静态资源后缀,用于优化性能
     * 请求静态资源不会 read/update redis 中的 session 信息
     */
    public static String[] STATIC_FILE_SUFFIX = new String[]{".css", ".js", ".png", ".jpg", ".gif", ".jpeg", ".bmp",
            ".ico", ".swf", ".map", ".ico", ".woff", ".woff2"};

    @Autowired
    public void setProjectProperties(ProjectProperties projectProperties) {
        CommonConst.projectProperties = projectProperties;
    }
}