#### Readme
To run visual regression on local you will require docker .

#### Steps:
##### In terminal 1
- Install docker
- cd ./build/visual-regression
- $ ./buildAndRun.sh 
- This will open the bash terminal inside docker
- $ bolt 
- $ yarn run record:image:snapshot (ensure the steps from terminal 2 are running)

##### In terminal 2
- $ bolt start:vr <pkg-name>