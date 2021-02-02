<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="xml" indent="yes"/>
  
  <xsl:template match="quiz">
    <quiz>
      <xsl:for-each select="t">
        <question>       
          <ask><xsl:value-of select="q"/></ask> 
          <answers>
            <answer><xsl:value-of select="a1"/></answer> 
            <answer><xsl:value-of select="a2"/></answer> 
            <answer><xsl:value-of select="a3"/></answer> 
            <answer><xsl:value-of select="a4"/></answer> 
          </answers>
          <correctAnswer><xsl:value-of select="c"/></correctAnswer>
        </question>
      </xsl:for-each>
    </quiz>
  </xsl:template>
</xsl:stylesheet>