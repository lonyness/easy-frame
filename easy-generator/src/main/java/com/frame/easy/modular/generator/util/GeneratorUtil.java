package com.frame.easy.modular.generator.util;

/**
 * 生成代码工具-通用
 *
 * @author tengchong
 * @date 2019-02-24
 */
public class GeneratorUtil {

    /**
     * 获取指定数量的tab
     *
     * @param count 数量
     * @return 空格 * count * 4
     */
    public static String getTab(int count) {
        StringBuilder tab = new StringBuilder();
        while (count > 0) {
            count--;
            tab.append("    ");
        }
        return tab.toString();
    }
}
