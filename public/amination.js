class Animation{
    
    constructor()
    {
        this.startAnimation=false;
        this.alpha = 0
    }

    draw(str,strWeight)
    {
        if(this.startAnimation)
        {
            this.alpha--;
            if(this.alpha<=0)
            {
                this.startAnimation=false
                

            }else{
                stroke(str)
                strokeWeight(strWeight)
                line(100,height-100,width-100,height-100)

            }
        }
    }

    change()
    {
        this.startAnimation=true;
        this.alpha=255;
    }


}