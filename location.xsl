<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:html="http://www.w3.org/1999/xhtml">


    <xsl:template match="/locations">
        <html:html>
            <html:head>
                <html:title>Locations</html:title>
                <html:style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 0;
                        color: #333;
                    }
                    .location {
                        border: 1px solid #ddd;
                        padding: 10px;
                        margin-bottom: 10px;
                        border-radius: 5px;
                    }
                    .location h2 {
                        margin: 0;
                        font-size: 1.5em;
                    }
                    .contact, .hours {
                        margin-top: 10px;
                    }
                    .contact p, .hours p {
                        margin: 0;
                    }
                </html:style>
            </html:head>
            <html:body>
                <h1>Locations</h1>
                <xsl:for-each select="location">
                    <div class="location">
                        <h2><xsl:value-of select="name"/></h2>
                        <p><strong>Address:</strong> <xsl:value-of select="address"/></p>
                        <div class="contact">
                            <p><strong>Phone:</strong> <xsl:value-of select="contact/phone"/></p>
                            <p><strong>Email:</strong> <xsl:value-of select="contact/email"/></p>
                        </div>
                        <div class="hours">
                            <p><strong>Weekday Hours:</strong> <xsl:value-of select="hours/weekday"/></p>
                            <p><strong>Weekend Hours:</strong> <xsl:value-of select="hours/weekend"/></p>
                        </div>
                        <p><strong>Latitude:</strong> <xsl:value-of select="latitude"/></p>
                        <p><strong>Longitude:</strong> <xsl:value-of select="longitude"/></p>
                    </div>
                </xsl:for-each>
            </html:body>
        </html:html>
    </xsl:template>

</xsl:stylesheet>
