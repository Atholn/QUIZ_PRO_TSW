<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="xml" indent="yes"/>
  
  <xsl:template match="quiz">
    <quiz>
      <xsl:for-each select="t">
        <zadanie>       
          <pytanie><xsl:value-of select="q"/></pytanie> 
          <odpowiedzi>
            <odpowiedz><xsl:value-of select="a1"/></odpowiedz> 
            <odpowiedz><xsl:value-of select="a2"/></odpowiedz> 
            <odpowiedz><xsl:value-of select="a3"/></odpowiedz> 
            <odpowiedz><xsl:value-of select="a4"/></odpowiedz> 
          </odpowiedzi>
          <prawidlowaOdpowiedz><xsl:value-of select="c"/></prawidlowaOdpowiedz>
        </zadanie>
      </xsl:for-each>
    </quiz>
  </xsl:template>
</xsl:stylesheet>