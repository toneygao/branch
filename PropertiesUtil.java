package com.loyal.fe.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.springframework.context.ApplicationContext;
/**
 * 
 * @author Administrator
 *
 */
public class PropertiesUtil {

	protected static Properties defaultProp = null;

	protected static ApplicationContext ctx = ApplicationContextHelper.getApplicationContext();
	// 初始化默认的属性集合
	static {
		if (defaultProp == null) {
			defaultProp = (Properties) ctx.getBean("configProperties");
		}
	}

	/**
	 * 解析属性文件，将文件中的所有属性都读取到【Properties】当中
	 */
	protected static Properties loadProperties(String fileName) {
		Properties prop = new Properties();
		InputStream ins = null;
		ins = PropertiesUtil.class.getClassLoader().getResourceAsStream(fileName);
		if (ins == null) {
			System.err.println("Can not find the resource!");
		} else {
			try {
				prop.load(ins);
			} catch (IOException e) {
				System.err.println("An error occurred when reading from the input stream, " + e.getMessage());
			} catch (IllegalArgumentException e) {
				System.err.println("The input stream contains a malformed Unicode escape sequence, " + e.getMessage());
			}
		}
		return prop;
	}

	/**
	 * 从指定的属性文件中获取某一属性值
	 */
	public static String getProperty(String fileName, String name) {
		if (fileName == null || "".equals(fileName)) {
			return defaultProp.getProperty(name);
		}
		Properties prop = loadProperties(fileName);
		return prop.getProperty(name);
	}

	public static String getProperty(String name) {
			return defaultProp.getProperty(name);
	}
	
}
