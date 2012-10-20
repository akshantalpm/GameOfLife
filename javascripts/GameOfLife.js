gameOfLife={
    board:[[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]],
    rowCount:90,
    colCount:90,
    initialize:function()
    {
        next = new Array(this.rowCount);
        for (j=0;j<this.rowCount;j++)
        { 
            next[j]=new Array(this.colCount);  
            for (k=0; k<this.colCount; k++)
            { 
                var state = Math.random();
                state = (state> 0.8)? 1:0;
                next[j][k] = state; 
            }
        }
        this.board=next;
        this.printBoard();
        oInstance=this;
        this.interval_id = setInterval(function(){oInstance.loop()}, 100);
    },
    getCanvasContext:function()
    {
        var canvas = document.body.getElementsByTagName("canvas")[0];
        return function(){
            return canvas.getContext("2d");
         
        }
    }(),
    printBoard:function()
    {
        var ctx = this.getCanvasContext();
        ctx.save();
        ctx.clearRect(0, 0, 450, 450);
        ctx.fillStyle = "rgb(0, 0, 0)";

        for(var i=0;i<this.rowCount;i=i+1)
        {
            for(var j=0;j<this.colCount;j=j+1)
            {
                if(this.board[i][j])
                {
                    ctx.fillRect (i*5, j*5, 5, 5);
                }
            }
        }

         ctx.restore();
         ctx.fill();
    },
    checkRuleForCell: function(j,k)
    {
        var cnt=0;

        ncount=this.neighbourCount(j,k);
        
        if(!this.board[j][k])
        { 
            if(ncount == 3)
            {
                cnt=1;
            }
        }     
        else
        {
            cnt=ncount == 2 || ncount == 3;        
        }
     
        return cnt;
    },
    neighbourCount:function(row,col)
    {
        var nc=0;
        for(var x = row-1; x <= row+1; x++)
        {
            for(var y = col-1; y <= col+1; y++)
            {
                if(x>= 0 && x <this.rowCount && y>= 0 && y <this.colCount)
                {
                    if(row != x || col != y)
                    {
                        if(this.board[x][y] == 1)
                        {
                            nc+=1;
                        }
                     }
                }
            }
        }
    
        return nc;
    },
    loop:function()
    {  
        next = new Array(this.rowCount);
        for (j=0;j<this.rowCount;j++)
        { 
            next[j]=new Array(this.colCount);  
            for (k=0; k<this.colCount; k++)
            { 
                next[j][k] = gameOfLife.checkRuleForCell(j, k); 
            }
        }

        this.board = next;
        this.printBoard(); 
    }
    
}   

gameOfLife.initialize();